import {render} from "@testing-library/react";
import RankingPageMobile from "./RankingPageMobile";

test("renders without crashing", () => {
    const { baseElement } = render(<RankingPageMobile />);
    expect(baseElement).toBeDefined();
});
