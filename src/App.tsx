import { Badge, Box, Button, Dialog, Text, VStack } from "@vapor-ui/core";
import { PageWrapper } from "./components/PageWrapper";

import { HeartIcon } from "@vapor-ui/icons";
import { SurveyList } from "./components/SurveyList";
import { Image } from "./components/Image";

function App() {
  return (
    <PageWrapper>
      <SurveyList title="GDS 강의 만족도 조사" date="25.01.10" />

      <Dialog.Root>
        <SurveyList
          title="GDS 강의 만족도 조사"
          date="25.01.11"
          Trigger={<Dialog.Trigger render={<Badge />}>설문하러 가기</Dialog.Trigger>}
        />
        <Dialog.Content>
          <Dialog.Header />
          <Dialog.Body>
            <VStack paddingY="$200" paddingX="$300" gap="$075">
              <Image />

              <Box
                render={<Text typography="heading5" foreground="normal-100" />}
                textAlign="center"
              >
                GDS발표가 유익하셨나요?
              </Box>
            </VStack>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close render={<Button stretch />}>
              네! <HeartIcon />
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      <SurveyList title="GDS 강의 만족도 조사" date="25.01.12" />
      <SurveyList title="GDS 강의 만족도 조사" date="25.01.13" />
      <SurveyList title="GDS 강의 만족도 조사" date="25.01.14" />
      <SurveyList title="GDS 강의 만족도 조사" date="25.01.11" />
    </PageWrapper>
  );
}

export default App;
