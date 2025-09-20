-- ✅ Allow authenticated users to UPLOAD (INSERT) only in designer-portfolios bucket
create policy "Authenticated can upload"
on storage.objects
for insert
to authenticated
with check ( bucket_id = 'designer-portfolios' );

-- ✅ Allow authenticated users to UPDATE only in designer-portfolios bucket
create policy "Authenticated can update"
on storage.objects
for update
to authenticated
using ( bucket_id = 'designer-portfolios' );

-- ✅ Allow authenticated users to DELETE only in designer-portfolios bucket
create policy "Authenticated can delete"
on storage.objects
for delete
to authenticated
using ( bucket_id = 'designer-portfolios' );




-- Allow authenticated users to upload (insert)
create policy "Authenticated can upload to designer-profiles"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'designer-profiles'
);

-- Allow uploader to update
create policy "Owner can update designer-profiles"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'designer-profiles'
  and auth.uid() = owner
);

-- Allow uploader to delete
create policy "Owner can delete designer-profiles"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'designer-profiles'
  and auth.uid() = owner
);





-- ✅ Allow authenticated users to UPLOAD (INSERT)
create policy "Authenticated can upload to designer-covers"
on storage.objects
for insert
to authenticated
with check ( bucket_id = 'designer-covers' );

-- ✅ Allow authenticated users to UPDATE
create policy "Authenticated can update designer-covers"
on storage.objects
for update
to authenticated
using ( bucket_id = 'designer-covers' );

-- ✅ Allow authenticated users to DELETE
create policy "Authenticated can delete designer-covers"
on storage.objects
for delete
to authenticated
using ( bucket_id = 'designer-covers' );





-- ✅ Allow authenticated users to UPLOAD (INSERT)
create policy "Authenticated can upload to blog-authors"
on storage.objects
for insert
to authenticated
with check ( bucket_id = 'blog-authors' );

-- ✅ Allow authenticated users to UPDATE
create policy "Authenticated can update blog-authors"
on storage.objects
for update
to authenticated
using ( bucket_id = 'blog-authors' );

-- ✅ Allow authenticated users to DELETE
create policy "Authenticated can delete blog-authors"
on storage.objects
for delete
to authenticated
using ( bucket_id = 'blog-authors' );




-- ✅ Allow authenticated users to UPLOAD (INSERT)
create policy "Authenticated can upload to blog-featured"
on storage.objects
for insert
to authenticated
with check ( bucket_id = 'blog-featured' );

-- ✅ Allow authenticated users to UPDATE
create policy "Authenticated can update blog-featured"
on storage.objects
for update
to authenticated
using ( bucket_id = 'blog-featured' );

-- ✅ Allow authenticated users to DELETE
create policy "Authenticated can delete blog-featured"
on storage.objects
for delete
to authenticated
using ( bucket_id = 'blog-featured' );




-- ✅ Allow authenticated users to UPLOAD (INSERT)
create policy "Authenticated can upload to event-featured"
on storage.objects
for insert
to authenticated
with check ( bucket_id = 'event-featured' );

-- ✅ Allow authenticated users to UPDATE
create policy "Authenticated can update event-featured"
on storage.objects
for update
to authenticated
using ( bucket_id = 'event-featured' );

-- ✅ Allow authenticated users to DELETE
create policy "Authenticated can delete event-featured"
on storage.objects
for delete
to authenticated
using ( bucket_id = 'event-featured' );
