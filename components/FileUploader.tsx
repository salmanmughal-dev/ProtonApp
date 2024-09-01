"use client";
import * as React from "react";
import { useState, CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";
import { useEdgeStore } from "../lib/edgestore";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function FileUploader({
  setUrl,
}: {
  setUrl: (url: string) => void;
}) {
  const [file, setFile] = React.useState<File>();
  let [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();

  const notify = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <DotLoader
        color={"#36d7b7"}
        loading={loading}
        cssOverride={override}
        size={250}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      {!loading && (
        <div className="flex items-center justify-center gap-10">
          {/* Same as */}

          <input
            className="file-upload"
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
          />
          <button
            className="m-2 rounded-lg bg-green-500 p-2 text-white"
            onClick={async () => {
              if (file) {
                setLoading(true);
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    // you can use this to show a progress bar
                    console.log(progress);
                  },
                });
                // you can run some server action or api here
                // to add the necessary data to your database
                setUrl(res.url);
                setLoading(false);
                notify();
              }
            }}
          >
            Upload
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
