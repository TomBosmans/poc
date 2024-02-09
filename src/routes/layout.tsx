import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { component$, Slot } from "@builder.io/qwik";
import { type User } from "~/schemas/user.schema";
import languageRepository from "~/repositories/language.repository";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export const useI18n = routeLoader$(async (event) => {
  // When signed in take the language of the user.
  const user: User | null = event.sharedMap.get("currentUser");
  const userLanguage = user?.language;
  if (userLanguage) {
    event.locale(userLanguage.code);
    return userLanguage.translations;
  }

  // Check accepted languages and try to fetch preferred language.
  const acceptLanguage = event.request.headers.get("accept-language");
  if (acceptLanguage) {
    const [languageCodes] = acceptLanguage.split(";");
    const [preferredLanguageCode] = languageCodes.split(",");
    const preferredLanguage = await languageRepository.findOne({
      where: { code: preferredLanguageCode },
    });
    if (preferredLanguage) {
      event.locale(preferredLanguage.code);
      return preferredLanguage.translations;
    }
  }

  // Take the default language.
  const defaultLanguage = await languageRepository.findOne({
    where: { code: "en-US" },
  });
  if (defaultLanguage) {
    event.locale(defaultLanguage.code);
    return defaultLanguage.translations;
  }

  // Should never happen, but if no language found throw an error.
  throw event.error(404, "Language not found");
});

export default component$(() => {
  return <Slot />;
});
