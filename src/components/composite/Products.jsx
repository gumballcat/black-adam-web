import CONSTANTS from "common/CONSTANTS";
import Pagination from "components/basic/Pagination";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import { useEffect, useRef, useState } from "react";
import Item from "./Item";
import PageHeading from "./PageHeading";

function Products({ data, heading, subheading, title, subtitle }) {
  const totalPages = Math.ceil(data.length / CONSTANTS.PAGE_SIZE);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(data);

  const ref = useRef(null);

  useEffect(() => {
    setProducts(data.slice((page - 1) * CONSTANTS.PAGE_SIZE, (page - 1) * CONSTANTS.PAGE_SIZE + CONSTANTS.PAGE_SIZE));
  }, [page, data]);

  return (
    <div className="products-main">
      <PageHeading id="top" text={heading} subtitle={subheading} />

      <section className="section" id="products" ref={ref}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <TextWithSubtitle text={title} subtitle={subtitle} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {products.map((product) => {
              return (
                <div className="col-lg-4">
                  <Item data={product} />
                </div>
              );
            })}
            <div className="col-lg-12">
              <Pagination
                total={totalPages}
                active={1}
                setPage={setPage}
                onClickCallback={() => {
                  ref.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Products;
