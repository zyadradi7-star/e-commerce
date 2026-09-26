import { getSingleProduct } from "@/Apis/Services/ProductsApi";
import AddBtn from "@/app/_Components/AddBtn/AddBtn";
import WishListBtn from "@/app/_Components/WishListBtn/WishListBtn";
import QuantitySelector from "@/app/_Components/QuantitySelector/QuantitySelector";
import ProductGallery from "@/app/_Components/ProductGallery/ProductGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaStar,
  FaRegStar,
  FaCartPlus,
  FaHeart,
  FaBolt,
  FaShareNodes,
  FaTruck,
  FaRotateLeft,
  FaShieldHalved,
  FaHouse,
  FaChevronRight,
} from "react-icons/fa6";

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    notFound();
  }

  const {
    count,
    title,
    description,
    price,
    priceAfterDiscount,
    ratingsAverage = 0,
    ratingsQuantity = 0,
    quantity = 0,
    category,
    brand,
    images = [],
    imageCover,
  } = product;

  // تجهيز مصفوفة الصور لمعرض الصور
  const galleryImages: string[] =
    images.length > 0 ? images : imageCover ? [imageCover] : [];

  const hasDiscount = Boolean(priceAfterDiscount && priceAfterDiscount < price);
  const finalPrice = hasDiscount ? priceAfterDiscount : price;
  const isInStock = quantity > 0;

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="py-4 bg-gray-50/50 border-b border-gray-100"
      >
        <div className="container mx-auto px-4">
          <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
            <li className="flex items-center">
              <Link
                href="/"
                className="hover:text-emerald-600 transition flex items-center gap-1.5"
              >
                <FaHouse className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <FaChevronRight className="w-3 h-3 mx-2 text-gray-400" />
            </li>

            {category && (
              <li className="flex items-center">
                <Link
                  href={`/categories/${category._id}`}
                  className="hover:text-emerald-600 transition"
                >
                  {category.name}
                </Link>
                <FaChevronRight className="w-3 h-3 mx-2 text-gray-400" />
              </li>
            )}

            <li
              className="text-gray-900 font-medium truncate max-w-xs"
              aria-current="page"
            >
              {title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Product Card */}
      <section className="py-8 bg-gray-50/30 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Product Gallery */}
              <div className="lg:col-span-5 sticky top-4">
                <ProductGallery images={galleryImages} />
              </div>

              {/* Right Column: Product Information */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Category & Brand Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    {category && (
                      <Link
                        href={`/categories/${category._id}`}
                        className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full font-medium hover:bg-emerald-100 transition"
                      >
                        {category.name}
                      </Link>
                    )}
                    {brand && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                        {brand.name}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-amber-400 gap-0.5 text-sm">
                      {[1, 2, 3, 4, 5].map((star) =>
                        ratingsAverage >= star ? (
                          <FaStar key={star} />
                        ) : (
                          <FaRegStar key={star} className="text-gray-300" />
                        ),
                      )}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {ratingsAverage}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({ratingsQuantity} reviews)
                    </span>
                  </div>

                  {/* Main Price */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-gray-900">
                      {finalPrice} EGP
                    </span>
                    {hasDiscount && (
                      <span className="text-base text-gray-400 line-through font-medium">
                        {price} EGP
                      </span>
                    )}
                  </div>

                  {/* Stock Badge Dynamic */}
                  <div className="mb-5">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${
                        isInStock
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isInStock ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      />
                      {isInStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {/* Description / Attributes */}
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Dynamic Interactive Quantity Selector */}
                  <QuantitySelector stockQuantity={quantity} />

                  {/* Total Price Bar */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center justify-between border border-gray-100">
                    <span className="text-sm text-gray-600 font-medium">
                      Total Price:
                    </span>
                    <span className="text-xl font-bold text-emerald-600">
                      {finalPrice} EGP
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <AddBtn
                      prodId={id}
                      cls="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-xs cursor-pointer"
                      child={
                        <>
                          <FaCartPlus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      }
                    />

                    <button className="w-full bg-slate-900 hover:bg-black text-white font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-sm cursor-pointer shadow-xs">
                      <FaBolt className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  {/* Secondary Buttons */}
                  <div className="flex items-center gap-3 mb-8">
                    <WishListBtn
                      prodId={id}
                      cls="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs cursor-pointer"
                      child={
                        <>
                          <FaHeart className="w-3.5 h-3.5 text-gray-500" />
                          <span>Add to Wishlist</span>
                        </>
                      }
                    />

                    <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition cursor-pointer">
                      <FaShareNodes className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                      <FaTruck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">
                        Free Delivery
                      </h4>
                      <p className="text-[10px] text-gray-400">
                        Orders over $50
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                      <FaRotateLeft className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">
                        30 Days Return
                      </h4>
                      <p className="text-[10px] text-gray-400">Money back</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                      <FaShieldHalved className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">
                        Secure Payment
                      </h4>
                      <p className="text-[10px] text-gray-400">
                        100% Protected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
