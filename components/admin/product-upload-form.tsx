import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ProductUploadForm() {
  return (
    <form action="/api/admin/products" method="POST" encType="multipart/form-data" className="mt-5 grid gap-3">
      <Input name="title" placeholder="Title" required />
      <Textarea name="description" placeholder="Description" required />
      <Input name="price" placeholder="Price" type="number" min="0" step="0.01" required />
      <Input name="tags" placeholder="Tags, comma separated" />
      <Input name="category" placeholder="Category" required />
      <Input name="file" type="file" required />
      <Button type="submit">Save product</Button>
    </form>
  );
}
