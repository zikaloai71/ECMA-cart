import { AppProviders } from '@/app/providers';
import { BundleBuilderPage } from '@/pages/bundle-builder/BundleBuilderPage';
import { DarkModeToggle } from '@/shared/ui/dark-mode-toggle/DarkModeToggle';

function App() {
  return (
    <AppProviders>
      <div className="flex justify-end px-4 py-3 sm:px-6 lg:px-10">
        <DarkModeToggle />
      </div>
      <BundleBuilderPage />
    </AppProviders>
  );
}

export default App;
