export default function CountryCard({ info }) {
  const {
    name: { official },
    population,
    region,
    flags: { svg, alt },
    capital,
  } = info;
  return (
      <li>
            <div className="card bg-base-100 w-72 shadow-sm">
              <figure className="w-full !min-h-40">
                <img
                  style={{
                    height: "160px",
                  }}
                  height={160}
                  className="w-full h-full object-cover object-center"
                  src={svg}
                  alt={alt}
                />
              </figure>
              <div className="card-body bg-base-200">
                <h2 className="card-title line-clamp-1">{official}</h2>
                <div className="flex flex-col gap-3">
                  <p>
                    <strong className="font-medium mr-1">Population:</strong>
                    {population}
                  </p>
                  <p>
                    <strong className="font-medium mr-1">Region:</strong>
                    {region}
                  </p>
                  <p>
                    <strong className="font-medium mr-1">Capital:</strong>
                    {capital}
                  </p>
                </div>
              </div>
            </div>
        </li>
  );
}
