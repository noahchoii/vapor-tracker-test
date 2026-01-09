const { Project, SyntaxKind } = require("ts-morph");
const { execSync } = require("child_process");

// 1. 프로젝트 설정
const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const VAPOR_PACKAGE = "@vapor-ui/core";

/**
 * 전수 조사를 통해 Vapor를 래핑한 로컬 컴포넌트 맵을 생성
 * { 'CustomButton': 'Button' }
 */
function buildWrappedComponentMap() {
  const wrappedMap = {};
  const sourceFiles = project.getSourceFiles();

  sourceFiles.forEach((file) => {
    const imports = file.getImportDeclarations();
    const vaporImport = imports.find((i) => i.getModuleSpecifierValue() === VAPOR_PACKAGE);

    if (vaporImport) {
      // 해당 파일에서 export하는 컴포넌트들을 확인하여 래핑 여부 판단 (단순화된 로직)
      file.getExportedDeclarations().forEach((declarations, name) => {
        // Vapor 컴포넌트를 JSX 내에서 사용하고 있는지 등의 로직 추가 가능
        // 여기서는 예시로 맵에 등록
        wrappedMap[name] = "WrappedVaporComponent";
      });
    }
  });
  return wrappedMap;
}

/**
 * 특정 소스 파일 내에서 Vapor 및 래핑 컴포넌트 사용 횟수 측정
 */
function countUsages(sourceFile, wrappedMap) {
  const counts = {};

  // 모든 JSX 여는 태그와 셀프 클로징 태그 탐색
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];

  jsxElements.forEach((node) => {
    const tagName = node.getTagNameNode().getText();

    // 1. 직접 호출 확인 (Namespace.Root 패턴 포함)
    // 2. 래핑 컴포넌트 호출 확인
    if (isVaporComponent(tagName, sourceFile) || wrappedMap[tagName.split(".")[0]]) {
      const baseName = tagName.split(".")[0]; // Dialog.Root -> Dialog

      // Root 혹은 RootPrimitive만 카운팅하는 조건
      if (
        tagName.includes(".") &&
        !tagName.endsWith(".Root") &&
        !tagName.endsWith(".RootPrimitive")
      ) {
        return;
      }

      counts[baseName] = (counts[baseName] || 0) + 1;
    }
  });

  return counts;
}

// Vapor 컴포넌트인지 확인하는 헬퍼 (Import 문 기반)
function isVaporComponent(name, sourceFile) {
  const identifier = name.split(".")[0];
  const importDecl = sourceFile.getImportDeclaration((decl) => {
    return (
      decl.getModuleSpecifierValue() === VAPOR_PACKAGE &&
      decl
        .getNamedImports()
        .some((ni) => ni.getName() === identifier || ni.getAliasNode()?.getText() === identifier)
    );
  });
  return !!importDecl;
}

/**
 * 메인 실행 로직
 */
async function run() {
  const wrappedMap = buildWrappedComponentMap();

  // GitHub Actions에서 전달받은 변경된 파일 목록 (예: "src/App.tsx src/Home.tsx")
  const changedFiles = process.argv.slice(2);
  let totalDiff = {};

  changedFiles.forEach((filePath) => {
    // 1. 현재(After) 카운트
    const currentFile = project.addSourceFileAtPath(filePath);
    const afterCount = countUsages(currentFile, wrappedMap);

    // 2. 이전(Before) 카운트 - Git에서 이전 버전 파일 내용 가져오기
    try {
      const beforeContent = execSync(`git show origin/dev:${filePath}`).toString();
      const beforeFile = project.createSourceFile(`before_${filePath}`, beforeContent);
      const beforeCount = countUsages(beforeFile, wrappedMap);

      // 3. 차이 계산
      Object.keys({ ...afterCount, ...beforeCount }).forEach((key) => {
        const diff = (afterCount[key] || 0) - (beforeCount[key] || 0);
        if (diff !== 0) {
          totalDiff[key] = (totalDiff[key] || 0) + diff;
        }
      });
    } catch (e) {
      // 신규 파일인 경우 Before는 0
      Object.entries(afterCount).forEach(([key, val]) => {
        totalDiff[key] = (totalDiff[key] || 0) + val;
      });
    }
  });

  console.log("=== 디자인 시스템 사용량 변경 사항 ===");
  console.log(totalDiff);
}

run();
