import { PageWrapper } from '@/shared/ui/page-wrapper/PageWrapper';
import { BundleBuilderLayout } from '@/widgets/builder/BundleBuilderLayout';
import { AddExtraProtectionStep } from '@/widgets/builder/steps/AddExtraProtectionStep';
import { ChooseCamerasStep } from '@/widgets/builder/steps/ChooseCamerasStep';
import { ChoosePlanStep } from '@/widgets/builder/steps/ChoosePlanStep';
import { ChooseSensorsStep } from '@/widgets/builder/steps/ChooseSensorsStep';

export function BundleBuilderPage() {
  return (
    <PageWrapper>
      <BundleBuilderLayout
        leftSection={
          <div className="space-y-5 md:space-y-6">
            <ChooseCamerasStep />
            <ChoosePlanStep />
            <ChooseSensorsStep />
            <AddExtraProtectionStep />
          </div>
        }
        rightSection={
          <aside className="rounded-card border border-border bg-surface p-6 shadow-card">
            <h2 className="text-xl font-semibold text-text">Review Panel</h2>
          </aside>
        }
      />
    </PageWrapper>
  );
}
