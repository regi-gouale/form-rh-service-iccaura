// import { FormData } from "@/components/contact";

import { toast } from "@/hooks/use-toast";
import { QFormData } from "@/types";

export function sendEmail(data: QFormData) {
  const apiEndpoint = "/api/email";

  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      toast({
        title: "Status de l'envoi de l'email",
        description: response.message,
      });
    })
    .catch((err) => {
      alert(err);
    });
}
