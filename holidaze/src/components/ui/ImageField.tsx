import FormField from "@/components/ui/FormField";
import { Button } from "./button";
import { Trash2  } from 'lucide-react';
import { Plus } from 'lucide-react';



interface ImageItem {
  url: string;
  alt: string;
}
interface ImageFieldProps {
      media: ImageItem[],
    
  
      onChange: (media: ImageItem[] ) => void;
      error?: string | null
        required?: boolean;
      
}


export default function ImageField({ media, onChange, error }: ImageFieldProps) {
  
    function updateItem(index: number, field: keyof ImageItem, value: string) {
  
        const next = media.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange(next);
  }

  function addItem() {
    if (media.length >= 8)return;
    onChange([...media, { url: "", alt: "" }]);
  }

  function removeItem(index: number) {
    onChange(media.filter((_, i) => i !== index));
  }

    return (
 <div className="flex flex-col gap-3">
          <p className="font-semibold">Images</p>

  {media.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-md border border-border bg-grey-100 p-3"
        >   
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Image {index + 1}
            </span>
            {media.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeItem(index)}
                aria-label={`Remove image ${index + 1}`}
              >
                <Trash2 />
              </Button>
            )}
          </div>
        

          <FormField
            label="Image URL"
            name={`media-url-${index}`}
            type="url"
            value={item.url}
            onChange={(e) => updateItem(index, "url", e.target.value)}
            placeholder="https://…"
          />
          <FormField
            label="Alt text"
            name={`media-alt-${index}`}
            value={item.alt}
            onChange={(e) => updateItem(index, "alt", e.target.value)}
            placeholder="Describe the image"
          />
        </div>
       
      ))}

      {error && (
        <span role="alert" className="text-sm text-destructive">
          {error}
        </span>
      )}
  
      <Button type="button" variant="outline" disabled={media.length >=8} onClick={addItem} className="self-end">
        <Plus /> Add image
      </Button>
        </div>

    )

}



