<?php

namespace App\Controller;

use App\Entity\Images;
use App\Repository\ImagesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\ItemsRepository;

class ImagesController extends AbstractController
{
    #[Route('/api/images', name: 'images', methods: ['GET'])]
    // #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour supprimer un utilisateur')]
    public function getImagesList(SerializerInterface $serializer, ImagesRepository $imagesRepository): JsonResponse
    {
        $imagesList = $imagesRepository->findAll();
        $jsonImageList = $serializer->serialize($imagesList, 'json', ['groups' => 'getImages']);
        return new JsonResponse($jsonImageList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/images/{id}', name: 'detailImages', methods: ['GET'])]
    public function getDetailImage(SerializerInterface $serializer, Images $images): JsonResponse
    {
        $jsonImage = $serializer->serialize($images, 'json', ['groups' => 'getImages']);
        return new JsonResponse($jsonImage, Response::HTTP_OK, ['accept' => 'json'], true);
    }
    #[Route('/api/images/{id}', name: "deleteImages", methods: ['DELETE'])]
    public function deleteImages(Images $images, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($images);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/images', name: 'app_add_image', methods: ['POST'])]
    public function addImage(Request $request, EntityManagerInterface $em, ItemsRepository $itemrepository): JsonResponse
    {
        $count = $_POST["images"];
        for ($i = 0; $i < $count; $i++) {
            $url = $this->upload("images" . $i);
            $newimage = new Images();
            $newimage->setUrl($url);
            $idItem = intval($_POST['idItem']) ?? -1;
            $newimage->setItems($itemrepository->find($idItem));
            $em->persist($newimage);
            $em->flush();
        }
        return new JsonResponse(null, Response::HTTP_CREATED, [], false);
    }

    public function upload($name)
    {
        $target_dir = "./uploads/";
        $info = pathinfo($_FILES[$name]['name']);
        $_FILES[$name]['name'] = uniqid();
        $target_file = $target_dir . basename(
            $_FILES[$name]["name"] . "." .
                $info['extension']
        );
        move_uploaded_file($_FILES[$name]["tmp_name"], $target_file);
        $curl = curl_init();
        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => 'http://145.239.142.113:4031/index.php',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => 'gzip, deflate',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => array('file' => new \CURLFILE($target_file)),
            )
        );
        $response = curl_exec($curl);
        curl_close($curl);
        unlink($target_file);
        return $response;
    }
}
