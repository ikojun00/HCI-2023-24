interface Session {
  user: { id: number; email: string; firstName: string };
}

interface Props {
  session: Session;
}

export default function Dashboard({ session }: Props) {
  return (
    <div className="flex flex-col gap-32">
      <div className="flex justify-center mt-20 text-2xl">
        Welcome, {session.user.firstName}! Here is what we have been reading...
      </div>
    </div>
  );
}
