import {
  HiMiniChevronDoubleDown,
  HiMiniChevronDoubleUp,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import DashboardHeader from "./DashboardHeader";
import { Link } from "react-router";
import PasswordHealthChart from "./PasswordHealthChart";
import AchievementProgress from "./AchievementProgress";

function DashboardContainer() {
  const { user, isPending } = useUser();

  if (isPending) return <ContainerLoader />;

  return (
    <>
      <DashboardHeader title="Dashboard">
        Welcome back,{" "}
        <span className="capitalize">{user?.user_metadata?.fullName}!</span>
        <br />
        Let&apos;s see what&apos;s new.
      </DashboardHeader>
      <div className="grid w-full grid-cols-12 gap-3 rounded-2xl py-4">
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-2 flex h-28 flex-col justify-between rounded-2xl border px-4 py-3 shadow-xs">
          <p className="font-heading text-lg font-medium">Vaults total</p>
          <h2 className="text-2xl leading-none font-light md:text-[32px] 2xl:text-4xl">
            20
          </h2>
          <div className="flex items-end justify-between">
            <p className="text-ruby-500 dark:text-ruby-600">
              20%{" "}
              <span className="text-charcoal-700 dark:text-charcoal-200 text-sm">
                are empty
              </span>
            </p>
            <Link to="/vaults">
              <span className="bg-ocean-700 inline-flex items-center justify-center rounded-lg p-1">
                <HiOutlineChevronRight
                  size={18}
                  className="text-ocean-100 inline rounded-lg"
                />
              </span>
            </Link>
          </div>
        </div>
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-2 flex h-28 flex-col justify-between rounded-2xl border px-4 py-3 shadow-xs">
          <p className="font-heading text-lg font-medium">Passwords total</p>
          <h2 className="text-2xl leading-none font-light md:text-[32px] 2xl:text-4xl">
            15
          </h2>
          <div className="flex items-end justify-between">
            <p className="text-mint-500 dark:text-mint-600">
              60%{" "}
              <span className="text-charcoal-700 dark:text-charcoal-200 text-sm">
                are safe
              </span>
            </p>
            <Link to="/passwords">
              <span className="bg-ocean-700 inline-flex items-center justify-center rounded-lg p-1">
                <HiOutlineChevronRight
                  size={18}
                  className="text-ocean-100 inline rounded-lg"
                />
              </span>
            </Link>
          </div>
        </div>
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-1 flex h-28 flex-col items-center justify-between rounded-2xl border py-3 shadow-xs">
          <p className="text-charcoal-700 dark:text-charcoal-200 font-medium">
            Strong
          </p>
          <div className="bg-ocean-150 text-ocean-800 rounded-xl px-2.5 font-medium">
            40
          </div>
          <div className="flex items-center">
            <HiMiniChevronDoubleDown size={12} />
            <p className="text-sm">50%</p>
          </div>
        </div>
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-1 flex h-28 flex-col items-center justify-between rounded-2xl border py-3 shadow-xs">
          <p className="text-charcoal-700 dark:text-charcoal-200 font-medium">
            Reused
          </p>
          <div className="bg-ocean-150 text-ocean-800 rounded-xl px-2.5 font-medium">
            150
          </div>
          <div className="flex items-center">
            <HiMiniChevronDoubleUp size={12} />
            <p className="text-sm">20%</p>
          </div>
        </div>
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-1 flex h-28 flex-col items-center justify-between rounded-2xl border py-3 shadow-xs">
          <p className="text-charcoal-700 dark:text-charcoal-200 font-medium">
            Weak
          </p>
          <div className="bg-ocean-150 text-ocean-800 rounded-xl px-2.5 font-medium">
            40
          </div>
          <div className="flex items-center">
            <HiMiniChevronDoubleUp size={12} />
            <p className="text-sm">20%</p>
          </div>
        </div>
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-1 flex h-28 flex-col items-center justify-between rounded-2xl border py-3 shadow-xs">
          <p className="text-charcoal-700 dark:text-charcoal-200 font-medium">
            Leaked
          </p>
          <div className="bg-ocean-150 text-ocean-800 rounded-xl px-2.5 font-medium">
            10
          </div>
          <div className="flex items-center">
            <HiMiniChevronDoubleUp size={12} />
            <p className="text-sm">80%</p>
          </div>
        </div>
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-4 flex h-fit flex-col gap-3 rounded-2xl border px-5 py-4 shadow-xs">
          <div className="flex items-center justify-center">
            <PasswordHealthChart />
          </div>
          <div className="divide-charcoal-400 divide-y-1">
            <h4 className="font-heading dark:text-charcoal-100 pb-2 text-xl font-semibold">
              Achievements
            </h4>
            <AchievementProgress
              title="Just Getting Started"
              percentage="20%"
              progressLabel="2/10"
              description="Save 10 passwords."
              barColor="bg-ruby-500"
              titleColor="text-ruby-500"
            />
            <AchievementProgress
              title="Cyber Guardian"
              percentage="50%"
              progressLabel="50%"
              description="Reach 75% password health."
              barColor="bg-rust-500"
              titleColor="text-rust-500"
            />
            <AchievementProgress
              title="Needs Work"
              percentage="45%"
              progressLabel="45%"
              description="Achieve 50% strong passwords."
              barColor="bg-butter-600"
              titleColor="text-butter-600"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardContainer;
