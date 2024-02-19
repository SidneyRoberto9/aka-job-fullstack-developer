import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
