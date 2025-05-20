

export default function VerifyEmailPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
      <p className="text-muted-foreground text-sm mb-6 max-w-md">
        We have sent a confirmation link to your email address. Please check your
        inbox and click the link to complete your signup.
      </p>

      {/* <Button
        onClick={() => router.push("/auth/get-started")}
        variant="outline"
      >
        Back to login
      </Button> */}
    </div>
  );
}
