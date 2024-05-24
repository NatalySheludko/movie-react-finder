import { Toaster } from "react-hot-toast";

export default function ErrorMessage() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          border: "2px solid #fc4400",
          background: "black",
          color: "white",
        },
        icon: "🐷",
      }}
    />
  );
}
