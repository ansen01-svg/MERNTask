export const postEmail = async (body) => {
  const url = `${process.env.REACT_APP_URL}/api/v1/email/scheduleEmail`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error response:", data);
      return data;
    }

    return data;
  } catch (error) {
    console.error("Error posting email:", error.message);
    return { success: false, message: "Try again later" };
  }
};
