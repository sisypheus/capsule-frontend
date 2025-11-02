import { createDeployment } from "@/features/deployments/api"
import Divider from "./Divider"
import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query";

export default function DeployForm({ projectProp }: any) {
  const navigate = useNavigate();
  const [project, setProject] = useState(projectProp.fullName)
  const [name, setName] = useState(project)
  const [branch, setBranch] = useState("main")
  const [port, setPort] = useState(80)
  const [dockerfilePath, setDockerfilePath] = useState(".")
  const queryClient = useQueryClient()

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const deploy = await createDeployment({ project: name, project_name: project, branch, dockerfile_path: dockerfilePath, port })
      queryClient.invalidateQueries({ queryKey: ["deployments"] })

      navigate({ to: `/deployment/$id/logs`, params: { id: deploy.id } })
    } catch (e) {
      alert("Error while deploying app")
    }
  }

  return (
    <form className='flex items-center justify-center flex-1' onSubmit={submit}>
      <div className="bg-gray-50 w-lg py-4 rounded-xl border-gray-200 border-2">
        <div className="border-b border-white/10 pb-12 px-4">
          <h2 className="text-base/7 font-semibold text-gray-900">New Project</h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            This information will be used to deploy the correct version of your project.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 w-full">
            <div className="col-span-full">
              <Divider />

            </div>
            <div className="col-span-full">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Project
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    type="text"
                    disabled
                    value={name}
                    className="block min-w-0 grow py-1.5 text-base pl-1 text-gray-700 placeholder:text-gray-500 focus:outline-none sm:text-sm/6 bg-gray-200 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Project name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-1 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 border border-gray-200">
                  <input
                    type="text"
                    value={project}
                    onChange={(e: any) => setProject(e.target.value)}
                    placeholder={project?.name}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  >
                  </input>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Branch</label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-1 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 border border-gray-200">
                  <input
                    type="text"
                    placeholder="main"
                    value={branch}
                    onChange={(e: any) => setBranch(e.target.value)}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Port</label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-1 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 border border-gray-200">
                  <input
                    type="text"
                    placeholder="main"
                    value={port}
                    onChange={(e: any) => setPort(e.target.value)}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                Dockerfile path
              </label>
              <div className="flex items-center rounded-md bg-white/5 pl-1 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 border border-gray-200">
                <input
                  type="text"
                  placeholder="./"
                  value={dockerfilePath}
                  onChange={(e: any) => setDockerfilePath(e.target.value)}
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                >
                </input>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-6 flex items-center justify-end gap-x-6 px-4">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
          >
            Deploy 🚀
          </button>
        </div>
      </div>
    </form>
  )
}
