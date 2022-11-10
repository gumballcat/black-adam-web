import CONSTANTS from "common/CONSTANTS";
import HELPER from "common/HELPER";
import Pagination from "components/basic/Pagination";
import Preloader from "components/basic/Preloader";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import { useEffect, useRef, useState } from "react";
import Item from "./Item";
import PageHeading from "./PageHeading";

function Products({ getEndpoint, heading, subheading, title, subtitle }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const ref = useRef(null);

  useEffect(() => {
    HELPER.HTTP.executeGet(getEndpoint, {
      start: (page - 1) * CONSTANTS.PAGE_SIZE,
      count: CONSTANTS.PAGE_SIZE,
    }).then((response) => {
      setProducts(response.content.items);
      setTotalPages(Math.ceil(response.content.total / CONSTANTS.PAGE_SIZE));
      setIsLoading(false);
    });
  }, [getEndpoint, page]);

  return (
    <div className="products-main">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <PageHeading id="top" text={heading} subtitle={subheading} />

          <section class="section" id="products" ref={ref}>
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="section-heading">
                    <TextWithSubtitle text={title} subtitle={subtitle} />
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                {products.map((product) => {
                  return (
                    <div className="col-lg-4">
                      <Item data={product} />
                    </div>
                  );
                })}
                <div class="col-lg-12">
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
        </>
      )}
    </div>
  );
}
export default Products;
