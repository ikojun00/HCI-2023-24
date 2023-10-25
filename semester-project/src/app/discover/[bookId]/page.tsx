interface Params {
  bookId: string;
}

export interface BookParams {
  params: Params;
}

export default function BlogPost({ params }: BookParams) {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-3xl font-bold p-10">Book #{params.bookId}</h1>
    </main>
  );
}
