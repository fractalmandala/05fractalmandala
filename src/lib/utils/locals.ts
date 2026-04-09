export async function wikiAuro() {
  const allfiles = import.meta.glob("/src/routes/wiki-auro/*.md");
  const filed = Object.entries(allfiles);
  const eachfiled = await Promise.all(
    filed.map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { metadata } = await resolver();
      const pathitem = path.slice(11, -3);
      return {
        meta: metadata,
        linkpath: pathitem,
      };
    }),
  );
  return eachfiled
  .filter((item) => Number(item.meta.id) !== 999)
  .sort((a, b) => {
  const titleA = a.meta.title || "";
  const titleB = b.meta.title || "";
  return titleA.localeCompare(titleB);
});
}

export async function wikiSRGSRS() {
  const allfiles = import.meta.glob("/src/routes/wiki-srg&srs/*.md");
  const filed = Object.entries(allfiles);
  const eachfiled = await Promise.all(
    filed.map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { metadata } = await resolver();
      const pathitem = path.slice(11, -3);
      return {
        meta: metadata,
        linkpath: pathitem,
      };
    }),
  );
  return eachfiled
  .filter((item) => Number(item.meta.id) !== 999)
  .sort((a, b) => {
  const titleA = a.meta.title || "";
  const titleB = b.meta.title || "";
  return titleA.localeCompare(titleB);
});
}

export async function wikiCivilization() {
  const allfiles = import.meta.glob("/src/routes/wiki-civilization/*.md");
  const filed = Object.entries(allfiles);
  const eachfiled = await Promise.all(
    filed.map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { metadata } = await resolver();
      const pathitem = path.slice(11, -3);
      return {
        meta: metadata,
        linkpath: pathitem,
      };
    }),
  );
  return eachfiled
  .filter((item) => Number(item.meta.id) !== 999)
  .sort((a, b) => {
  const titleA = a.meta.title || "";
  const titleB = b.meta.title || "";
  return titleA.localeCompare(titleB);
});
}

export async function wikiWritings() {
    const allfiles = import.meta.glob("/src/routes/wiki-writings/*.md");
    const filed = Object.entries(allfiles);
    const eachfiled = await Promise.all(
      filed.map(async ([path, resolver]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { metadata } = await resolver();
        const pathitem = path.slice(11, -3);
        return {
          meta: metadata,
          linkpath: pathitem,
        };
      }),
    );
    return eachfiled
        .filter((item) => Number(item.meta.id) !== 999)
        .sort((a, b) => {
        const titleA = a.meta.title || "";
        const titleB = b.meta.title || "";
        return titleA.localeCompare(titleB);
    });
  }

  export async function wikiJanapada() {
    const allfiles = import.meta.glob("/src/routes/wiki-janapada/*.md");
    const filed = Object.entries(allfiles);
    const eachfiled = await Promise.all(
      filed.map(async ([path, resolver]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { metadata } = await resolver();
        const pathitem = path.slice(11, -3);
        return {
          meta: metadata,
          linkpath: pathitem,
        };
      }),
    );
    return eachfiled
        .filter((item) => Number(item.meta.id) !== 999)
        .sort((a, b) => {
        const titleA = a.meta.title || "";
        const titleB = b.meta.title || "";
        return titleA.localeCompare(titleB);
    });
  }

  export async function wikiThea() {
    const allfiles = import.meta.glob("/src/routes/wiki-thea/*.md");
    const filed = Object.entries(allfiles);
    const eachfiled = await Promise.all(
      filed.map(async ([path, resolver]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { metadata } = await resolver();
        const pathitem = path.slice(11, -3);
        return {
          meta: metadata,
          linkpath: pathitem,
        };
      }),
    );
    return eachfiled
        .filter((item) => Number(item.meta.id) !== 999)
        .sort((a, b) => {
        const titleA = a.meta.title || "";
        const titleB = b.meta.title || "";
        return titleA.localeCompare(titleB);
    });
  }

  export async function wikiHistory() {
    const allfiles = import.meta.glob("/src/routes/wiki-history/*.md");
    const filed = Object.entries(allfiles);
    const eachfiled = await Promise.all(
      filed.map(async ([path, resolver]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { metadata } = await resolver();
        const pathitem = path.slice(11, -3);
        return {
          meta: metadata,
          linkpath: pathitem,
        };
      }),
    );
    return eachfiled
        .filter((item) => Number(item.meta.id) !== 999)
        .sort((a, b) => {
        const titleA = a.meta.title || "";
        const titleB = b.meta.title || "";
        return titleA.localeCompare(titleB);
    });
  }
