import { Group, Skeleton, Stack } from "@mantine/core";

const LoadingSkeleton = ({
  quantity,
  my = 0,
}: {
  quantity: number;
  my?: number;
}) => {
  return (
    <>
      <Stack my={my}>
        {[...Array(quantity)].map(() => (
          <Group align="center">
            <Skeleton height={40} circle />
            <Skeleton height={20} width="70%" />
          </Group>
        ))}
      </Stack>
    </>
  );
};

export default LoadingSkeleton;
