import { renderHook } from "@testing-library/react-hooks";
import useRequest from "./useRequest";

const reposMock = [
  { name: "repo1", description: "Repo 1" },
  { name: "repo2", description: "Repo 2" },
];

afterEach(() => {
  global.fetch.mockClear();
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe("useRequest hook", () => {
  it("should return data after fetch", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(reposMock),
      })
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest("coco/repos")
    );
    await waitForNextUpdate();

    expect(result.current).toEqual({
      isLoading: false,
      data: reposMock,
      error: "",
    });
  });

  it("should return an empty array in data, after fetch", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest("coco/repos")
    );
    await waitForNextUpdate();

    expect(result.current).toEqual({
      isLoading: false,
      data: [],
      error: "",
    });
  });

  it("should return an error, after fetch", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve(null),
      })
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest("/repos")
    );
    await waitForNextUpdate();

    expect(result.current).toEqual({
      isLoading: false,
      data: null,
      error: "404",
    });
  });
});
