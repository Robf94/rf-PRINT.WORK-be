const request = require("supertest");
const app = require("../app");

describe("GET /api/albums", () => {
  // it("200: should respond with an array of the top 100 albums", () => {
  //   return request(app)
  //     .get("/api/albums")
  //     .expect(200)
  //     .then(({ body }) => {
  //       const albums = body.paginatedAlbums;
  //       albums.forEach((album) => {
  //         expect(typeof album.artistName).toBe("string");
  //         expect(typeof album.id).toBe("string");
  //         expect(typeof album.name).toBe("string");
  //         expect(typeof album.releaseDate).toBe("string");
  //         expect(album.kind).toEqual("albums");
  //         if (album.artistName === "Various Artists") {
  //           expect(album.artistId).toBeUndefined();
  //           expect(album.artistUrl).toBeUndefined();
  //         } else {
  //           expect(typeof album.artistId).toBe("string");
  //           expect(typeof album.artistUrl).toBe("string");
  //         }
  //         expect(typeof album.artworkUrl100).toBe("string");
  //         expect(Array.isArray(album.genres)).toBe(true);
  //         expect(typeof album.url).toBe("string");
  //       });
  //     });
  // });
    it("200: should respond with an array of the top 100 albums", () => {
      return request(app)
        .get("/api/albums")
        .expect(200)
        .then(({ body }) => {
          const albums = body.albums;
          albums.forEach((album) => {
            expect(typeof album.artistName).toBe("string");
            expect(typeof album.id).toBe("string");
            expect(typeof album.name).toBe("string");
            expect(typeof album.releaseDate).toBe("string");
            expect(album.kind).toEqual("albums");
            if (album.artistName === "Various Artists") {
              expect(album.artistId).toBeUndefined();
              expect(album.artistUrl).toBeUndefined();
            } else {
              expect(typeof album.artistId).toBe("string");
              expect(typeof album.artistUrl).toBe("string");
            }
            expect(typeof album.artworkUrl100).toBe("string");
            expect(Array.isArray(album.genres)).toBe(true);
            expect(typeof album.url).toBe("string");
          });
        });
    });

  // it("200: should return 10 albums per page for pagination", () => {
  //   return request(app)
  //     .get("/api/albums?_page=1&_limit=10")
  //     .expect(200)
  //     .then(({ body }) => {
  //       const albums = body.paginatedAlbums;
  //       expect(albums.length).toBe(10);
  //       albums.forEach((album) => {
  //         expect(typeof album.artistName).toBe("string");
  //       });
  //     });
  // });
});

describe("GET /api/albums/:id", () => {
  it("should response with album data from the given id", () => {
    return request(app)
      .get("/api/albums/663097964")
      .expect(200)
      .then(({ body }) => {
        const album = body.album;
        expect(album).toEqual({
          artistName: "Arctic Monkeys",
          id: "663097964",
          name: "AM",
          releaseDate: "2013-09-09",
          kind: "albums",
          artistId: "62820413",
          artistUrl: "https://music.apple.com/gb/artist/arctic-monkeys/62820413",
          artworkUrl100:
            "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/cc/0f/2d/cc0f2d02-5ff1-10e7-eea2-76863a55dbad/887828031795.png/100x100bb.jpg",
          genres: [
            {
              genreId: "20",
              name: "Alternative",
              url: "https://itunes.apple.com/gb/genre/id20",
            },
            {
              genreId: "34",
              name: "Music",
              url: "https://itunes.apple.com/gb/genre/id34",
            },
            {
              genreId: "21",
              name: "Rock",
              url: "https://itunes.apple.com/gb/genre/id21",
            },
          ],
          url: "https://music.apple.com/gb/album/am/663097964",
        });
      });
  });
  it("404: Should return the relevant message if given a valid albumId that either does not exist or is not in the top 100 list", () => {
    return request(app)
      .get("/api/albums/999999999999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Album does not exist, or is not currently in the top 100.");
      });
  });

  it("400: should return the relevant message if given an invalid albumId", () => {
    return request(app)
      .get("/api/albums/invalid-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("album ID must be a number.");
      });
  });
});
