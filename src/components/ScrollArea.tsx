import * as RadixScrollArea from "@radix-ui/react-scroll-area";

export const ScrollArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <RadixScrollArea.Root className="ScrollAreaRoot overflow-hidden bg-white">
      <RadixScrollArea.Viewport className="h-full w-full rounded-md border bg-gray-50">
        <div className="h-72">{children}</div>
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className="flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
        orientation="vertical"
      >
        <RadixScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-200" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
};
