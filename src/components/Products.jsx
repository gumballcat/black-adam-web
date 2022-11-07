import CONSTANTS from "common/CONSTANTS";
import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import Pagination from "components/basic/Pagination";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import { useEffect, useRef, useState } from "react";
import Item from "./composite/Item";

function Products() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const ref = useRef(null);

  useEffect(() => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_LATEST_PRODUCTS, {
      start: (page - 1) * CONSTANTS.PAGE_SIZE,
      count: CONSTANTS.PAGE_SIZE,
    }).then((response) => {
      setProducts(response.content.items);
      setTotalPages(Math.ceil(response.content.total / CONSTANTS.PAGE_SIZE));
    });
  }, [page]);

  return (
    <div className="products-main">
      <div class="page-heading" id="top">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="inner-content">
                <TextWithSubtitle
                  text="Check Our Products"
                  subtitle="Up And Coming Items"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="section" id="products" ref={ref}>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-heading">
                <TextWithSubtitle
                  text="Our Latest Products"
                  subtitle="Check out all of our latest products"
                />
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
    </div>
  );
}
export default Products;
