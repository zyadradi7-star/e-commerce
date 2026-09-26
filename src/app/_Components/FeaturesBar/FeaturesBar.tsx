import { FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IconType } from "react-icons";

type FeatureItem = {
  icon: IconType;
  title: string;
  desc: string;
  cardIconBg: string;
  cardIconColor: string;
};

type FeaturesBarProps = {
  variant?: "cards" | "flat"; // تحديد نوع التصميم
  bgClass?: string; // إمكانية تغيير لون الخلفية الخارجية عند الحاجة
};

const featuresData: FeatureItem[] = [
  {
    icon: FaTruck,
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
    cardIconBg: "bg-blue-50",
    cardIconColor: "text-blue-500",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payment",
    desc: "100% secure transactions",
    cardIconBg: "bg-emerald-50",
    cardIconColor: "text-emerald-500",
  },
  {
    icon: FaArrowRotateLeft,
    title: "Easy Returns",
    desc: "14-day return policy",
    cardIconBg: "bg-orange-50",
    cardIconColor: "text-orange-500",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    desc: "Dedicated support team",
    cardIconBg: "bg-purple-50",
    cardIconColor: "text-purple-500",
  },
];

export default function FeaturesBar({
  variant = "cards",
  bgClass,
}: FeaturesBarProps) {
  const isCards = variant === "cards";

  // تنسيق الحاوي الخارجي بناءً على النمط
  const wrapperStyle =
    bgClass ||
    (isCards
      ? "bg-gray-50 py-10"
      : "bg-emerald-50 border-y border-emerald-100 p-8");

  return (
    <div className={`w-full ${wrapperStyle}`}>
      <div className="container mx-auto px-4">
        <div
          className={
            isCards
              ? "grid md:grid-cols-2 lg:grid-cols-4 gap-4"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          }
        >
          {featuresData.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={
                  isCards
                    ? "flex gap-4 bg-white items-center p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                    : "flex gap-3 items-center"
                }
              >
                {/* صندوق الأيقونة */}
                <div
                  className={
                    isCards
                      ? `w-12 h-12 rounded-full ${item.cardIconBg} ${item.cardIconColor} flex justify-center items-center text-xl shrink-0`
                      : "w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex justify-center items-center text-xl shrink-0"
                  }
                >
                  <Icon />
                </div>

                {/* النصوص */}
                <div>
                  <h3
                    className={
                      isCards
                        ? "text-foreground text-sm font-semibold"
                        : "text-gray-900 text-sm font-bold leading-tight"
                    }
                  >
                    {item.title}
                  </h3>
                  <p
                    className={
                      isCards
                        ? "text-muted-foreground text-xs font-medium"
                        : "text-gray-500 text-xs font-medium mt-0.5"
                    }
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
