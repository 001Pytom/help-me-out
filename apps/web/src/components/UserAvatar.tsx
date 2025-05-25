"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { useToastConfirm } from "../../app/hooks/useToastConfirm";

interface Props {
  size?: number;
  editable?: boolean;
}

export default function UserAvatar({ size = 40, editable = false }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      const googleAvatar = user?.identities?.find(
        (id) => id.provider === "google"
      )?.identity_data?.avatar_url;

      const customAvatar = user?.user_metadata?.avatar_url;

      setUrl(customAvatar || googleAvatar || null);
    };
    load();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error("Upload failed - try again.");
      setLoading(false);
      return;
    } else {
      toast.success("Upload successful!");
    }

    const publicUrl = supabase.storage.from("avatars").getPublicUrl(data.path)
      .data.publicUrl;

    // yo update user metadata
    await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });

    setUrl(publicUrl);
    setLoading(false);
  };

  //
  const confirm = useToastConfirm();

  const handleRemove = async () => {
    const result = await confirm(
      "Are you sure you want to remove your avatar?"
    );

    if (!result) return;

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { avatar_url: null },
    });
    setUrl(null);
    setLoading(false);

    if (error) {
      toast.error("Failed to remove avatar.");
    } else {
      setUrl(null);
      toast.success("Avatar removed.");
    }
  };

  return (
    <div className="relative">
      {url ? (
        <Image
          src={url}
          alt="avatar"
          width={size}
          height={size}
          className="rounded-full object-cover aspect-square"
        />
      ) : (
        <Image
          src="/profileCircle.png"
          alt="avatar"
          width={size}
          height={size}
          className="rounded-full object-cover "
        />
      )}

      {editable && (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            className={`absolute inset-0  text-white flex items-center justify-center rounded-full transition w-10 h-10 `}
            onClick={() => fileRef.current?.click()}
          >
            {
              loading && (
                <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white"></div>
              )
              // : (
              //   <>
              //     {/* <UploadCloud className="w-3 h-3" /> */}
              //   </>
              // )
            }
          </button>
          {url && (
            <X
              className="w-3 h-3 cursor-pointer absolute bottom-0 right-0 bg-gray rounded-full  text-white"
              onClick={handleRemove}
            />
          )}
        </>
      )}
    </div>
  );
}
