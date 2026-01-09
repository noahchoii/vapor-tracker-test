import { HStack, VStack } from "@vapor-ui/core";
import { PropsWithChildren } from "react";

type PageWrapperProps = PropsWithChildren;

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <HStack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      padding={"$200"}
    >
      <VStack width={"100%"} maxWidth={"40rem"} gap="$075">
        {children}
      </VStack>
    </HStack>
  );
};
