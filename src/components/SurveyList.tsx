import { Text, Button, HStack, VStack } from "@vapor-ui/core";

interface SurveyListProps {
  title: string;
  date: string;
  Trigger?: React.ReactNode;
}

const DefaultButton = () => {
  return (
    <Button
      size="xl"
      color="secondary"
      variant="fill"
      onClick={() => alert("Dialog는 어떤 버튼을 클릭했을 때 열릴까요?")}
    >
      Button
    </Button>
  );
};

export const SurveyList = ({ title, date, Trigger }: SurveyListProps) => {
  const SurveyButton = Trigger || <DefaultButton />;

  return (
    <HStack justifyContent="space-between" alignItems="center" paddingY="$150" paddingX="$200">
      <VStack gap="$100">
        <Text typography="heading5" foreground="normal-200">
          {title}
        </Text>
        <Text typography="subtitle1" foreground="normal-200">
          {date}
        </Text>
      </VStack>

      {SurveyButton}
    </HStack>
  );
};
