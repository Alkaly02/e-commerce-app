import { toast } from 'react-hot-toast';
export default function successMsg(message) {
    toast.success(message, {
        style: {
          backgroundColor: "#2B3445",
          color: "white",
        },
        iconTheme: {
          primary: "green",
        },
      });
}