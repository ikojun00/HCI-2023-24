import NavbarItem from "../../types/interfaces/NavbarItem";

const qGetAllNavbarNames = `query {
    navbarCollection {
        items {
            title,
            path,
            dropdowns
        }
    }
}`;

interface navbarCollectionResponse {
  navbarCollection: {
    items: NavbarItem[];
  };
}

const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

const getAllNavbarNames = async () => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: qGetAllNavbarNames }),
    });

    const body = (await response.json()) as {
      data: navbarCollectionResponse;
    };

    const products = body.data.navbarCollection.items.map((item) => ({
      title: item.title,
      path: item.path,
      dropdowns: item.dropdowns.map((dropdown) => dropdown)
    }));

    return products;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const ContentfulService = {
  getAllNavbarNames,
};

export default ContentfulService;