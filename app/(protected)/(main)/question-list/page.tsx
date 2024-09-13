import QuestionForm from '@/app/(protected)/(main)/question-list/_components/question-form';
import { getQuestions } from '@/app/data/question';
import QuestionList from '@/app/(protected)/(main)/question-list/_components/question-list';
import SortingDropdown from '@/components/sorting-dropdown';
import { QUESTIONSORTS } from '@/constants/sort';
import { QuestionSort } from '@/type';
import { unstable_cache } from 'next/cache';

const getQuestionWithCache = unstable_cache(
  async ({
    take,
    order,
    answerTake,
    location,
  }: {
    take: number;
    order: QuestionSort;
    answerTake: number;
    location?: string;
  }) => {
    const result = await getQuestions({ take, order, answerTake, location });
    return result;
  },
  ['questionList'],
  { revalidate: 3600, tags: ['questionList'] },
);

export default async function Page({
  searchParams,
}: {
  searchParams: { sort: QuestionSort; location: string };
}) {
  const { sort, location } = searchParams;
  const qusetions = await getQuestionWithCache({
    take: 7,
    order: sort,
    answerTake: 5,
    location,
  });

  return (
    <main className="w-full">
      <div className="relative flex flex-col items-center w-full gap-4 p-5">
        <h1 className="text-2xl font-semibold">
          <span className="text-3xl font-bold text-primary">길라</span>에게 바로 물어보세요!
        </h1>
        <QuestionForm />
      </div>
      <div className="flex flex-col items-center w-full gap-2 p-5">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold">질문 목록</h2>
          <SortingDropdown sorts={QUESTIONSORTS} />
        </div>
        <QuestionList
          questions={qusetions.questions}
          questionCursorId={qusetions.cursorId}
          location={location}
        />
      </div>
    </main>
  );
}
