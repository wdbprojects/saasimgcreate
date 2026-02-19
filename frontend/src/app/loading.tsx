import { Spinner } from "@/components/ui/spinner";

const LoadingPage = async () => {
  return (
    <div className="flex h-full w-full items-center justify-center border">
      <Spinner className="text-primary size-24" />
    </div>
  );
};

export default LoadingPage;

{
  /* <CircleDashed color="#fa7f26" strokeWidth={1.25} /> */
}
