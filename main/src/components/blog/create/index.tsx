import CreateBlogForm from "./form";
import Preview from "./preview";
import CreateBlogProvider from "@components/providers/create-blog-provider";

export default function CreateBlog() {
  return (
    <CreateBlogProvider>
      <div className="mb-4 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
              <li className="me-2" role="presentation">
                  <button className="inline-block p-4 border-b-2 rounded-t-lg" id="form-tab" data-tabs-target="#form" type="button" role="tab" aria-controls="form" aria-selected="false">Formulario</button>
              </li>
              <li className="me-2" role="presentation">
                  <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="preview-tab" data-tabs-target="#preview" type="button" role="tab" aria-controls="preview" aria-selected="false">Vista previa</button>
              </li>
          </ul>
      </div>
      <div id="default-tab-content">
          <div className="hidden p-4 rounded-lg" id="form" role="tabpanel" aria-labelledby="form-tab">
              
            <CreateBlogForm />

          </div>
          <div className="hidden p-4 rounded-lg" id="preview" role="tabpanel" aria-labelledby="preview-tab">
              
            <Preview />

          </div>
      </div>
    </CreateBlogProvider>
  )
}