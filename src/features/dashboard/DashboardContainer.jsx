import {
  HiMiniChevronDoubleDown,
  HiMiniChevronDoubleUp,
  HiOutlineArrowPath,
  HiOutlineChevronRight,
  HiOutlineSquare2Stack,
} from "react-icons/hi2";
import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import DashboardHeader from "./DashboardHeader";
import { Link } from "react-router";
import PasswordHealthChart from "./PasswordHealthChart";
import AchievementProgress from "./AchievementProgress";
import PasswordsByVaultChart from "./PasswordsByVaultChart";
import PasswordStatusChart from "./PasswordStatusChart";
import Button from "../../ui/Button";

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
      <div className="grid w-full grid-flow-row grid-cols-12 grid-rows-[minmax(7rem,auto)_minmax(7rem,auto)] gap-3 rounded-2xl py-4">
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
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-4 row-span-3 flex flex-col justify-between gap-3 rounded-2xl border px-5 py-4 shadow-xs">
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
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-5 row-span-2 rounded-2xl border px-4 py-3 shadow-xs">
          <h4 className="font-heading dark:text-charcoal-100 pb-1 text-xl font-semibold">
            Passwords by vault
          </h4>
          <div>
            <PasswordsByVaultChart />
          </div>
        </div>
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-3 row-span-2 rounded-2xl border px-4 py-3 shadow-xs">
          <h4 className="font-heading dark:text-charcoal-100 pb-1 text-xl font-semibold">
            Password status overview
          </h4>
          <div>
            <PasswordStatusChart />
          </div>
        </div>
        <div className="border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 col-span-6 row-span-2 rounded-2xl border px-4 pt-4 pb-3 shadow-xs">
          <h4 className="font-heading dark:text-charcoal-100 pb-1 text-xl leading-none font-semibold">
            Password generator
          </h4>
          <p className="dark:text-charcoal-400 text-charcoal-600 leading-5">
            Build a password with the perfect balance of security.
          </p>
          <div className="my-2 space-y-2">
            <div className="flex items-center justify-between">
              <p>Symbols</p>
              <div className="flex items-center gap-2">
                <Button type="primaryxs">+</Button>
                <p className="">5</p>
                <Button type="rawxs">-</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p>Digits</p>
              <div className="flex items-center gap-2">
                <Button type="primaryxs">+</Button>
                <p className="">5</p>
                <Button type="rawxs">-</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p>Upper case characters</p>
              <div className="flex items-center gap-2">
                <Button type="primaryxs">+</Button>
                <p className="">5</p>
                <Button type="rawxs">-</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p>Length</p>
              <div className="flex w-full items-center gap-2">
                <input
                  min={8}
                  max={50}
                  type="range"
                  className="accent-ocean-500 active:accent-ocean-500 hover:accent-ocean-500 ml-auto h-1 w-1/2 outline-none"
                />
                <p>10</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="dark:border-charcoal-300 bg-ocean-100 dark:bg-charcoal-800 border-charcoal-100 w-full rounded-lg border px-3 py-1.5">
                hello
              </div>
              <Button type="rawlg">
                <HiOutlineSquare2Stack size={20} />
              </Button>
              <Button type="rawlg">
                <HiOutlineArrowPath size={20} />
              </Button>
            </div>
            <p className="text-charcoal-500 dark:text-charcoal-400 text-xs">
              Your password contains 5 symbols, 5 digits, and 10 characters.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardContainer;
