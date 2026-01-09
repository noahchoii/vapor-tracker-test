import { Button, Dialog, VStack } from "@vapor-ui/core";
import { HeartIcon } from "@vapor-ui/icons";

export const MyDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Content>
        <Dialog.Header />
        <Dialog.Body render={<VStack alignItems="center" justifyContent="center" gap="$075" />}>
          <img
            style={{ height: "120px" }}
            src="https://statics.goorm.io/gds/resources/images/light/survey.svg"
            alt="Survey"
          />
          <Dialog.Title style={{ paddingBottom: "var(--space-200)" }}>
            GDS 발표가 유익하셨나요?
          </Dialog.Title>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button size="lg" color="primary" stretch />}>
            네! <HeartIcon />
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

{
  /*  */
}
