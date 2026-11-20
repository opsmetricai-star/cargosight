-- Run once after schema.sql (this project does not auto-grant table privileges).
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;

grant select on public.profiles to authenticated;
grant update (full_name, company) on public.profiles to authenticated;  -- plan & credits are server-only
grant select, insert, update, delete on public.carriers, public.shipments, public.exceptions, public.notifications, public.documents to authenticated;
grant select on public.usage_events, public.subscriptions to authenticated;
grant insert on public.demo_requests to anon, authenticated;
