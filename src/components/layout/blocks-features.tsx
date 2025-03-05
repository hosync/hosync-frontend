const Features: React.FC = () => {
  return (
    <section className="py-4 bg-white dark:bg-black">
      <div className="container mx-auto px-4" style={{ marginTop: '-40px' }}>
        <h1 className="text-4xl font-bold text-center mb-8 uppercase dark:text-white">
          Manage your bookings <br />
          from start to end
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          <div
            className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-300"
            data-testid="bookingdiv"
          >
            <img
              src="/images/icon_booking.svg"
              alt="Booking Icon"
              className="h-16 w-16 mb-4"
              data-testid="booking"
            />
            <h2 className="text-xl font-semibold mb-2 uppercase">
              Manage your bookings
            </h2>
            <p className="text-gray-600">Simplify Booking for Everyone</p>
          </div>
          <div
            className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-300"
            data-testid="pricingdiv"
          >
            <img
              src="/images/icon_price.svg"
              alt="Price Icon"
              className="h-16 w-16 mb-4"
              data-testid="price-icon"
            />
            <h2 className="text-xl font-semibold mb-2 uppercase">
              Flexible Pricing
            </h2>
            <p className="text-gray-600">
              Choose from our free tier or enhanced features to fit your
              business needs.
            </p>
          </div>
          <div
            className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-300"
            data-testid="businessdiv"
          >
            <img
              src="/images/icon_business.svg"
              alt="Business Icon"
              className="h-16 w-16 mb-4"
              data-testid="business-icon"
            />
            <h2 className="text-xl font-semibold mb-2 uppercase">
              Measure your business
            </h2>
            <p className="text-gray-600">Easily Measure Your Success</p>
          </div>
          <div
            className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-300"
            data-testid="phonediv"
          >
            <img
              src="/images/icon_phone.svg"
              alt="Phone Icon"
              className="h-16 w-16 mb-4"
              data-testid="phone-icon"
            />
            <h2 className="text-xl font-semibold mb-2 uppercase">
              Run your business from your phone
            </h2>
            <p className="text-gray-600">Stay Connected and Process Sales</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Features }
