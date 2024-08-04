import { getMyActivities } from '@/app/data/activity';
import MyActivityList from '@/app/(protected)/(user)/(dashboard)/my-activity/_components/my-activity-list';
import ActivityCreateModal from './_components/activity-create-modal';

export default async function Page() {
  const myActivities = await getMyActivities({ take: 7 });
  return (
    <>
      <div>
        <h1 className="text-lg font-bold mb-3">내가 등록한 활동</h1>
        <MyActivityList
          myActivities={myActivities.activities}
          activityCursorId={myActivities.cursorId}
        />
      </div>
      <ActivityCreateModal />
    </>
  );
}