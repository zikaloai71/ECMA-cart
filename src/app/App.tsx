import { BundleBuilderPage } from '@/pages/bundle-builder/BundleBuilderPage';
import { useDarkMode } from '@/shared/lib/useDarkMode';
import { DarkModeToggle } from '@/shared/ui/dark-mode-toggle/DarkModeToggle';

function App() {
  const { isDark, toggle } = useDarkMode();

  return (
    <>
      <div className="flex justify-end px-4 py-3 sm:px-6 lg:px-10">
        <DarkModeToggle isDark={isDark} onToggle={toggle} />
      </div>
      <BundleBuilderPage />
    </>
  );
}

export default App;
