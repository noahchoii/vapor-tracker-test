import type { SheetRootProps } from "@vapor-ui/core";
import { Sheet as VaporSheet, Button, VStack, Box } from "@vapor-ui/core";
import { HeartIcon } from "@vapor-ui/icons";

type SheetProps = SheetRootProps;

export const Sheet = (props: SheetProps) => {
  return (
    <>
      <VaporSheet.Root {...props}>
        <VaporSheet.Content>
          <VaporSheet.Header />
          <VaporSheet.Body
            render={<VStack justifyContent={"center"} alignItems={"center"} gap="$075" />}
          >
            <img
              style={{ height: "120px" }}
              src="https://statics.goorm.io/gds/resources/images/light/survey.svg"
              alt="Survey"
            />
            <Box paddingBottom="$200" render={<VaporSheet.Title />}>
              GDS 발표가 유익하셨나요?
            </Box>
          </VaporSheet.Body>
          <VaporSheet.Footer>
            <VaporSheet.Close render={<Button size="lg" stretch />}>
              네! <HeartIcon />
            </VaporSheet.Close>
          </VaporSheet.Footer>
        </VaporSheet.Content>
      </VaporSheet.Root>
    </>
  );
};
