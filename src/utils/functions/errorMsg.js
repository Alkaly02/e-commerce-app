import { toast } from 'react-hot-toast';
export default function errorMsg(message) {
    toast.error(message, {
        style: {
          backgroundColor: "#2B3445",
          color: "white",
        },
        iconTheme: {
          primary: "red",
        },
      });
}