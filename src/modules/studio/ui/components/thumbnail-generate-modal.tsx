import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface ThumbnailGenerateModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formsSchema = z.object({
  prompt: z.string().min(10),
});

export function ThumbnailGenerateModal({
  videoId,
  open,
  onOpenChange,
}: ThumbnailGenerateModalProps) {
  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess: () => {
      toast.success("Background job started", {
        description: "This may take some time",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const form = useForm<z.infer<typeof formsSchema>>({
    resolver: zodResolver(formsSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formsSchema>) => {
    generateThumbnail.mutate({
      prompt: values.prompt,
      id: videoId,
    });
  };
  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      title="Upload a thumbnail"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    cols={30}
                    rows={5}
                    placeholder="A description of wanted thumbnail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={generateThumbnail.isPending}>
              Generate
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
}
