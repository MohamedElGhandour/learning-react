import React from "react";
import { configure, shallow } from "enzyme";
import Adaptor from "@wojtekmaj/enzyme-adapter-react-17";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adaptor() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />);
  });

  it("should render <BuildControls /> when receving props Ingredients", () => {
    wrapper.setProps({ ingredient: {} });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
