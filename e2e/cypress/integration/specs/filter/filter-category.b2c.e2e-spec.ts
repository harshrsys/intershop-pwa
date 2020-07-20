import { at } from '../../framework';
import { FamilyPage } from '../../pages/shopping/family.page';

const _ = {
  product: {
    sku: '872843',
    name: 'Epson Multipack',
    defaultCategory: {
      categoryId: 'Computers.225.373.377',
      name: 'Ink Cartridges',
      results: 30,
    },
  },
  filter: {
    name: 'Price',
    entryName: 'ProductSalePriceGross_50_0_TO_99_99',
    results: 9,
  },
};

describe('Product Category Context', () => {
  describe('located under default category', () => {
    before(() => FamilyPage.navigateTo(_.product.defaultCategory.categoryId));

    it('should see the product on the family page', () => {
      at(FamilyPage, page => {
        page.productList.makeAllProductsVisible();
        page.productList.productTile(_.product.sku).should('contain', _.product.name);
      });
    });

    it('should see the correct filter with expecting results', () => {
      at(FamilyPage, page => {
        page.filterNavigation
          .filter(_.filter.name)
          .getFilter(_.filter.entryName)
          .should('contain', `(${_.filter.results})`);
      });
    });

    it('should filter products by price', () => {
      at(FamilyPage, page => page.filterNavigation.filter(_.filter.name).filterClick(_.filter.entryName));
    });

    it(`should see other results in search result page`, () => {
      at(FamilyPage, page => page.productList.numberOfItems.should('equal', _.filter.results));
    });

    it('should deselect filter', () => {
      at(FamilyPage, page => page.filterNavigation.filter(_.filter.name).filterClick(_.filter.entryName));
    });

    it(`should see other results in search result page`, () => {
      at(FamilyPage, page => page.productList.numberOfItems.should('equal', _.product.defaultCategory.results));
    });
  });
});
