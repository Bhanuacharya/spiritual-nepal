import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ne', name: 'नेपाली' }
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-2xl font-bold text-primary">
                  Nepal Spirit
                </span>
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/destinations">
              <Button variant="ghost">{t('nav.destinations')}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">{t('nav.contact')}</Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map(({ code, name }) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => i18n.changeLanguage(code)}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">{t('nav.toggleTheme')}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}