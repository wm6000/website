import { auth } from "@/lib/auth";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>

      {session?.user ? (
        <div className="mt-8">
          <ProfileForm />
        </div>
      ) : (
        <p className="mt-4 text-muted-foreground">
          Sign in to set up your profile.
        </p>
      )}
    </div>
  );
}
