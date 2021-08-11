export const sendSelectedStep = ({
  route,
  stepId,
  recordId,
  recordType,
  setLinks,
}) =>
  fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stepId,
      recordId,
      recordType,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      }

      if (!data.links) {
        return [];
      }

      return data.links;
    });

// Assumes that the route has no query params if passed the record id and type
export const getSteps = async ({ route, recordId, recordType }) => {
  const ourRoute =
    recordId && recordType
      ? `${route}?id=${recordId}&type=${recordType}`
      : route;

  return fetch(ourRoute)
    .then((res) => res.json())
    .then((data) => {
      const { steps, selectedStepId = 0, links = null } = data;

      return {
        steps,
        selectedStepId,
        links,
      };
    });
};
