import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    // console.log(error)
    errors.forEach(({ isError, fallback, error }) => {
      if (isError) {
        if (fallback) fallback();
        else
          toast.error(
            error?.data?.message || "Something went wrong in error Hook"
          );
      }
    });
  }, [errors]);
};

const useAsyncMutation = (mutationHook) => {
  const [mutation] = mutationHook();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Loading data...");

    try {
      const res = await mutation(...args);
      if (res.data) {
        toast.success(res?.data?.message || "Updated data successfully", {
          id: toastId,
        });
        console.log(res.data);
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
  return [executeMutation, isLoading, data];
};

const useSocketEvents = (socket, handlers,chatId) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket,handlers,chatId]);
};

export { useErrors, useAsyncMutation, useSocketEvents };
