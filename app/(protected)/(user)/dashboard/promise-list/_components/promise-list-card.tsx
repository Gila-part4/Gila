import ImageCard from '@/components/image-card';
import SmallButton from '@/components/small-button';
import UserIcon from '@/components/user-icon';
import PromiseStatus from '@/app/(protected)/(user)/dashboard/promise-list/_components/promise-status';

export default function PromiseListCard() {
  const status = 'REJECT';
  return (
    <ImageCard
      title="함께 배우는 즐거운 스트릿 댄스"
      date="2024-07-19 ~ 2024-07-19"
      time="16 : 00 ~ 18 : 00"
      participants={10}
      extraContent={<UserIcon name="Sjae" />}
      bottomContent={
        <div className="flex items-center w-full justify-between">
          <PromiseStatus status={status} />
          <SmallButton color="bg-primary" name="취소" />
        </div>
      }
    />
  );
}
